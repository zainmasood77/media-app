pipeline {
    agent any

    environment {
        DOCKER_BUILDKIT = '0'
        COMPOSE_DOCKER_CLI_BUILD = '0'
    }

    stages {

        stage('Clean Workspace') {
            steps {
                echo "Cleaning workspace safely..."

                // Try normal cleanup, ignore failure
                script {
                    try {
                        deleteDir()
                    } catch (err) {
                        echo "Normal cleanup failed, forcing cleanup..."
                        sh '''
                        rm -rf /var/jenkins_home/workspace/media-app* || true
                        '''
                    }
                }
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
                    echo "Installing Node.js..."

                    # Install Node.js if not installed
                    if ! command -v node > /dev/null; then
                        apt-get update
                        apt-get install -y curl
                        curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
                        apt-get install -y nodejs
                    fi

                    echo "Node version:"
                    node -v
                    npm -v

                    echo "Installing dependencies..."
                    npm install

                    echo "Building React app..."
                    npm run build
                    '''
                }
            }
        }

        stage('Deploy App') {
            steps {
                sh '''
                echo "Deploying app with Docker Compose..."

                docker-compose down || true
                docker-compose up -d --build
                '''
            }
        }
    }

    post {
        success {
            echo '🎉 Deployment Successful! Your app is live.'
        }
        failure {
            echo '❌ Deployment Failed!'
        }
    }
}
