pipeline {
	agent any
	stages {
		stage('Build frontend') {
			steps {
                try{
                echo "============= Building frontend!============"
                sh 'npm install'
                }catch (err) {
                    echo "Caught: ${err}"
                    currentBuild.result = 'FAILURE'
                }

			}
          post{
                always{
                    echo "========always========"
                }
                success{
                    echo "======== frontend Build executed successfully========"
                }
                failure{
                    echo "=======frontend Build execution failed========"
                }
            }
		}
		stage('Build backend') {
			steps {
				echo "============= Building backend============"
			}
          post{
                always{
                    echo "========always========"
                }
                success{
                    echo "======== backend Build executed successfully========"
                }
                failure{
                    echo "=======backend Build execution failed========"
                }
            }
		}
		stage('Build Eth Contracts') {
			steps {
				echo "============= Building Eth Contracts============"
			}
          post{
                always{
                    echo "========always========"
                }
                success{
                    echo "======== Eth Contracts Build executed successfully========"
                }
                failure{
                    echo "=======Eth Contracts Build execution failed========"
                }
            }
		}
		stage('Build Sol Contracts') {
			steps {
				echo "============= Building Sol Contracts============"
			}
          post{
                always{
                    echo "========always========"
                }
                success{
                    echo "========  Sol Contracts Build executed successfully========"
                }
                failure{
                    echo "======= Sol Contracts Build execution failed========"
                }
            }
		}
	}
	post{
        always{
            echo "========always========"
        }
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}
