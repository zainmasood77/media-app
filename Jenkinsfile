pipeline {
    agent any

    environment {
        DOCKER_BUILDKIT = '0'
        COMPOSE_DOCKER_CLI_BUILD = '0'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/zainmasood77/media-app.git'
            }
        }

        stage('Build Frontend') {
            steps {
                sh """
                echo "Building frontend using Docker..."

                docker run --rm \
                  -v ${WORKSPACE}/frontend:/app \
                  -w /app \
                  node:18 \
                  sh -c "npm install && npm run build"
                """
            }
        }

        stage('Deploy App') {
            steps {
                sh '''
                echo "Deploying full app with Docker Compose..."

                docker-compose down || true
                docker-compose up -d --build
                '''
            }
        }
    }

    post {
        success {
            echo '🎉 Full App Deployment Successful!'
        }
        failure {
            echo '❌ Deployment Failed!'
        }
    }
}