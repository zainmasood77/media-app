pipeline {
    agent any

    stages {

        stage('Build Frontend') {
            steps {
                sh '''
                docker run --rm \
                -v $WORKSPACE:/workspace \
                -w /workspace/frontend \
                node:18 \
                sh -c "npm install && npm run build"
                '''
            }
        }

        stage('Deploy Frontend') {
            steps {
                sh 'rm -rf /var/www/html/*'
                sh 'cp -r frontend/build/* /var/www/html/'
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
