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
                    echo "Using Node inside Docker properly..."

                    docker run --rm \
                      -v $(pwd):/app \
                      -w /app \
                      node:18 \
                      sh -c "npm install && npm run build"
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
            echo '🎉 SUCCESS: App deployed!'
        }
        failure {
            echo '❌ FAILED'
        }
    }
}
