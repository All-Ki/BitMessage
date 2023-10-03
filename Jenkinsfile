node {
        bat "npm --version"
		stage('Build frontend') {
            try{
                    echo "============= Building frontend!============"
                 dir("webapp/frontend"){
                    bat "npm install"
                    bat "npm run build"
                 }
            }
            catch (exc) {
                echo "Caught: ${exc}"
                currentBuild.result = 'FAILURE'
        }

		}
		stage('Build backend') {
            echo "============= Building backend============"

            try{
                dir("webapp/backend"){
                    bat "npm install"
                    bat "npm run build"
                 }
            }
            catch (exc) {
                echo "Caught: ${exc}"
                currentBuild.result = 'FAILURE'
        }


		}
		stage('Build Eth Contracts') {

            echo "============= Building  Eth Contracts============"

            try{
                dir("blockchain/solidity"){
                 }
            }
            catch (exc) {
                echo "Caught: ${exc}"
                echo "DID YOU SET TRUFFLE AS A GLOBAL PACKAGE IN JENKINS ? "
                currentBuild.result = 'FAILURE'
        }


		}
		stage('Build Sol Contracts') {

				echo "============= Building Sol Contracts============"
		}


}
