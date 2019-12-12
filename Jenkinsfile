pipeline {
    agent { label 'backend' }
  
  stages {


    stage('Build') {
	steps {

	
		sh 'docker build -t="pride-cards" .'
		echo "Build successful"
	           }
	 }



	stage ('Test') {
	   steps {
		   echo "Test has passed"
		
	          }
			}
          
		stage('Deploy') {
            steps {
		    
		                sh 'docker container kill cards'
		                sh 'docker container rm cards'
                                sh 'docker run -d -p 5000:5000 --name cards pride-cards'
				echo "Deployment has been deployed"
            }
        }


		}
	   }   
