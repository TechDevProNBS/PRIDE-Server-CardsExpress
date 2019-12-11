pipeline {
    agent any
  
  stages {

	  stage('Clone') {
		steps{

		 sh 'git clone https://github.com/TechDevProNBS/PRIDE-Server-CardsExpress.git'
	  }

	  }
    stage('Build') {
	steps {

	
		sh 'docker build --tag "PrideCards"'
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
				echo "Deployment has been deployed"
            }
        }


		}
	   }   
