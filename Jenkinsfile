pipeline {
    agent any

    stages {

        stage('Build Frontend') {
            steps {
                sh '''
                docker run --rm \
                -v /tmp:/tmp \
                node:18 sh -c "
                cp -r /tmp/workspace /app &&
                cd /app/frontend &&
                npm install &&
                npm run build
                "
                '''
            }
        }

        stage('Prepare Workspace') {
            steps {
                sh 'cp -r $WORKSPACE /tmp/workspace'
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
