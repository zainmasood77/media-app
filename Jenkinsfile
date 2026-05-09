pipeline {
    agent any

    stages {

        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/zainmasood77/media-app.git'
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh '''
                    echo "Building frontend..."

                    ls -la

                    npm install
                    npm run build
                    '''
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                sh '''
                echo "Deploying backend..."

                docker-compose down || true
                docker-compose up -d --build
                '''
            }
        }
    }

    post {
        success {
            echo '🎉 SUCCESS'
        }
        failure {
            echo '❌ FAILED'
        }
    }
}
