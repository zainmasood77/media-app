pipeline {
    agent any

    stages {

        stage('Prepare Workspace') {
            steps {
                sh 'cp -r $WORKSPACE /tmp/workspace'
            }
        }

        stage('Build Frontend') {
            steps {
                sh '''
                docker run --rm \
                -v /tmp/workspace:/app \
                -w /app/frontend \
                node:18 \
                sh -c "npm install && npm run build"
                '''
            }
        }

        stage('Deploy Frontend') {
            steps {
                sh '''
                rm -rf /var/www/html/*
                cp -r frontend/build/* /var/www/html/
                '''
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
