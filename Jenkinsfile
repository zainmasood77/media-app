pipeline {
    agent any
    stages {
        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/zainmasood77/media-app.git'
            }
        }
        stage('Clean Docker') {
            steps {
                sh '''
                docker system prune -af || true
                '''
            }
        }
        stage('Deploy') {
            steps {
                sh '''
                echo "Deploying..."
                docker-compose down || true
                docker-compose up -d --build
                '''
            }
        }
        stage('Refresh ASG') {
            steps {
                sh '''
                echo "Triggering ASG instance refresh..."
                aws autoscaling start-instance-refresh \
                    --auto-scaling-group-name media-app-asg \
                    --region us-east-1 \
                    --preferences MinHealthyPercentage=50 || true
                '''
            }
        }
    }
    post {
        success {
            echo '✅ Deployed and ASG refreshed successfully'
        }
        failure {
            echo '❌ FAILED'
        }
    }
}
