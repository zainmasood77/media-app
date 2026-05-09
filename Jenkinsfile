pipeline {
    agent any

    environment {
        DOCKER_BUILDKIT = '0'
        COMPOSE_DOCKER_CLI_BUILD = '0'
    }

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
                sh '''
                echo "Building frontend using Docker (FIXED)..."

                docker run --rm \
                  -v /var/jenkins_home/workspace/media-app:/workspace \
                  -w /workspace/frontend \
                  node:18 \
                  sh -c "ls -la && npm install && npm run build"
                '''
            }
        }

        stage('Deploy App') {
            steps {
                sh '''
                echo "Deploying app..."

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
