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
                dir('frontend') {
                    sh '''
                    echo "Installing Node..."
                    
                    # Install Node if not present
                    if ! command -v node > /dev/null; then
                      curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
                      apt-get install -y nodejs
                    fi

                    node -v
                    npm -v

                    npm install
                    npm run build
                    '''
                }
            }
        }

        stage('Deploy App') {
            steps {
                sh '''
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
