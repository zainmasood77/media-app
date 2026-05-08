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
    agent {
        docker {
            image 'node:18'
            args '-u root'
        }
    }
    steps {
        dir('frontend') {
            sh '''
            npm install
            npm run build
            '''
        }
    }
}

    }
}
