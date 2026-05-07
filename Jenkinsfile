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

       stage('Build Frontend') {
    steps {
        sh '''
        docker run --rm \
        -v $(pwd)/frontend:/app \
        -w /app \
        node:18 \
        npm install
        '''
    }
}

    }
}
