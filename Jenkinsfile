pipeline {
    agent any

    stages {

        stage('Build Frontend') {
            steps {
                sh '''
                docker run --rm -i node:18 sh -c "
                mkdir app && cd app &&
                cat > app.tar &&
                tar -xf app.tar &&
                cd frontend &&
                npm install &&
                npm run build
                " < <(tar -cf - .)
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
