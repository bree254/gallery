pipeline {
    agent any
    tools {
      nodejs 'nodejs-23'
    }

    triggers {
        githubPush() 
    }

    stages{
        stage('checkout'){
            steps{
                git branch :'master',url: 'https://github.com/bree254/gallery.git'
            }
        }
        
        stage('Install Dependencies') {
           steps {
                echo 'Installing Node.js dependencies...'
                 sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                echo 'Building application...'
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                withCredentials([
                    string(credentialsId: 'mongo-username', variable: 'MONGO_USERNAME'),
                    string(credentialsId: 'mongo-password', variable: 'MONGO_PASSWORD'),
                    string(credentialsId: 'mongo-cluster', variable: 'MONGO_CLUSTER')
                ]) {
                    echo 'Running tests...'
                    sh 'npm test'
                }
            }
            
        }

        stage('Deploy to Render') {
      steps {
        withCredentials([string(credentialsId: 'gallery-render-hook', variable: 'DEPLOY_HOOK')]) {
          sh 'curl -X POST $DEPLOY_HOOK'
        }
      }
    }

    }

    post {
        success {
            emailext(
                to: 'brendawanjiru72@gmail.com',
                subject: "✅ SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "The pipeline ran successfully! Check details at ${env.BUILD_URL}"
            )

            withCredentials([string(credentialsId: 'slack-webhook', variable: 'SLACK_WEBHOOK')]) {
                sh """
                    curl -X POST -H 'Content-type: application/json' \
                    --data '{"text":"✅ Jenkins Pipeline Success! Build ID: '${BUILD_NUMBER}' | Render URL: https://gallery-gt1r.onrender.com"}' \
                    $SLACK_WEBHOOK
                """
            }
        }
        failure {
            emailext(
                to: 'brendawanjiru72@gmail.com',
                subject: "❌ FAILURE: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "The pipeline failed. See console logs: ${env.BUILD_URL}",
                attachLog: true
            )

            withCredentials([string(credentialsId: 'slack-webhook', variable: 'SLACK_WEBHOOK')]) {
                sh """
                    curl -X POST -H 'Content-type: application/json' \
                    --data '{"text":"❌ FAILURE: '${JOB_NAME}' #${BUILD_NUMBER}"}' \
                    $SLACK_WEBHOOK
                """
            }

        }
    }
}
