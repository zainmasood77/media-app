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

        stage('Deploy Frontend') {
            steps {
                sh '''
                echo "Deploying frontend to /var/www/html..."

                mkdir -p /var/www/html
                rm -rf /var/www/html/*

                cp -r frontend/build/* /var/www/html/
                '''
            }
        }

        stage('Deploy Backend') {
            steps {
                sh '''
                echo "Deploying backend using docker-compose..."

                # Disable buildx (IMPORTANT FIX)
                export DOCKER_BUILDKIT=0
                export COMPOSE_DOCKER_CLI_BUILD=0

                docker-compose down || true
                docker-compose up -d --build
                '''
            }
        }
    }

    post {
        success {
            echo '🎉 Deployment Successful!'
        }
        failure {
            echo '❌ Deployment Failed!'
        }
    }
}
