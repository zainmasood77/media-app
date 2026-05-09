pipeline {
    agent any

    stages {

        stage('Build Frontend') {
            steps {
                sh '''
                docker run --rm \
                -v $PWD/frontend:/app \
                -w /app \
                node:18 \
                sh -c "npm install && npm run build"
                '''
            }
        }

        stage('Deploy Frontend') {
            steps {
                sh 'sudo rm -rf /var/www/html/*'
                sh 'sudo cp -r frontend/build/* /var/www/html/'
            }
        }

        stage('Deploy Backend') {
            steps {
                sh 'docker compose down'
                sh 'docker compose up -d --build'
            }
        }
    }
}
