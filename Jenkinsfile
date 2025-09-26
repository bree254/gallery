pipeline {
    agent any
    tools {
      nodejs 'nodejs-23'
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
            post {
                failure {
                    emailext (
                        to: 'brendawanjiru72@gmail.com',
                        subject: 'Jenkins Pipeline Failed - Test Stage',
                        body: 'The test stage in Jenkins pipeline has failed. Please check the console output for details.',
                        attachLog: true
                    )
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
            withCredentials([string(credentialsId: 'slack-webhook', variable: 'SLACK_WEBHOOK')]) {
                sh '''
                    curl -X POST -H 'Content-type: application/json' \
                    --data '{"text":"✅ Jenkins Pipeline Success! Build ID: '${BUILD_NUMBER}' | Render URL: https://gallery-gt1r.onrender.com"}' \
                    $SLACK_WEBHOOK
                '''
            }
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
