# How to use 
Please read below how to execute the scripts.

# Cloning the git repository to your local


# Build Project
1. Go to project folder */Iovio_TestAssement_Atomar/
2. rum commnd : npm install

# Start test execution

Test is build using a single feature file "tommy_Registration.feature"
Option 
1. To run all scenarios, use tag @AllRegression
2. To run Registrantion Scenario, use tag @UserRegistration
3. To run add address Scenario, use tag @UpdateUserAddress

--Test Execution:
1. Go to project folder */Iovio_TestAssement_Atomar/
2. Run Command : npm test -- --cucumberOpts.tagExpression='{test_tag}'

Example: 
    Update user address scenario: npm test -- --cucumberOpts.tagExpression='@UpdateUserAddress'

# Notes
New test data is genearted automaticall, No change require.
