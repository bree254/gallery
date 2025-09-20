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

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
            post {
                failure {
                    emailext (
                        to: 'your-email@example.com',
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
}