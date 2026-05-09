pipeline {
    agent any

    stages {
        stage('Debug Frontend Structure') {
            steps {
                sh '''
                echo "===== ROOT ====="
                ls -la

                echo "===== FRONTEND ====="
                ls -R frontend
                '''
            }
        }
    }
}
