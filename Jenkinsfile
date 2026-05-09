pipeline {
    agent any

    stages {

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                sh '''
                mkdir -p /var/www/html
                rm -rf /var/www/html/*
                cp -r frontend/build/* /var/www/html/
                '''
            }
        }

        stage('Deploy Backend') {
            steps {
                sh 'docker-compose down || true'
                sh 'DOCKER_BUILDKIT=0 docker-compose up -d --build'
            }
        }
    }
}
