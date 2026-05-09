pipeline {
    agent any

    stages {

        stage('Detect & Build Frontend') {
            steps {
                sh '''
                echo "=== Checking project structure ==="
                ls -la

                if [ -f "frontend/package.json" ]; then
                    echo "Frontend found in /frontend"
                    cd frontend
                elif [ -f "package.json" ]; then
                    echo "Frontend found in root"
                else
                    echo "ERROR: No package.json found!"
                    exit 1
                fi

                echo "=== Installing dependencies ==="
                docker run --rm \
                    -v $PWD:/app \
                    -w /app \
                    node:18 \
                    sh -c "npm install && npm run build"
                '''
            }
        }

        stage('Deploy Frontend') {
            steps {
                sh '''
                rm -rf /var/www/html/*

                if [ -d "frontend/build" ]; then
                    cp -r frontend/build/* /var/www/html/
                elif [ -d "build" ]; then
                    cp -r build/* /var/www/html/
                else
                    echo "ERROR: Build folder not found!"
                    exit 1
                fi
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
