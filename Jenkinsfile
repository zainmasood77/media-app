pipeline {
    agent any

    stages {

        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/zainmasood77/media-app.git'
            }
        }

        stage('Debug Paths') {
            steps {
                sh 'pwd'
                sh 'ls -la'
                sh 'ls -la frontend'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
docker run --rm \
-v $WORKSPACE/frontend:/app \
-w /app \
node:18 \
npm install
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                sh '''
docker run --rm \
-v $WORKSPACE/frontend:/app \
-w /app \
node:18 \
npm run build
                '''
            }
        }
    }
}
