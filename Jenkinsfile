pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh '''
                    echo "Installing frontend dependencies..."
                    npm install

                    echo "Building frontend..."
                    npm run build
                    '''
                }
            }
        }

        stage('Deploy App') {
            steps {
                sh '''
                echo "Deploying full app with Docker Compose..."

                # Fix for Docker buildx issue
                export DOCKER_BUILDKIT=0
                export COMPOSE_DOCKER_CLI_BUILD=0

                # Stop old containers (ignore error if none exist)
                docker-compose down || true

                # Build and start everything (frontend + backend)
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
