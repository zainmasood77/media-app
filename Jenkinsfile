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

        stage('Install Node & Build Frontend') {
            steps {
                sh '''
                apt update
                apt install -y nodejs npm

                cd frontend
                npm install
                '''
            }
        }

    }
}
