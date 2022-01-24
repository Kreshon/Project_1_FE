Components
    - complete statistics guard against employees navigating to this page

Processes
    - errors for service layer
    - if manager, you can only change employee comment on YOUR reimbursments

CSS DO THIS NO MATTER WHAT

react native/expo stuff
    - dont forget the storage
    - login
    - reimbursment list
    - approval/denial

ngrok
    - demo

logging
    - winston or bunyon

Stretch
    - managers can only change thier comments, employees viceversa 
    - guard after login, can't access login page again without logout
    - guard against empty fields
    - guard navigation without login processing
    - guard against reimbursement id in navigation
    - debug names coming up as undefined on occassion 

1/31/22
    project due
    Adam did say that he will be requiring us to implement even more features and tools into p1

Agile update
    - statistics page done
    - guarded managers and employees changing each others comments
    - guard manager approving or denying their own reimbursment

    - Issues: detail reimb page was getting hung up and sending a payload of an array of reimbursements instead of user, 
    wrapped use effect in an if statement to make sure it won't get the user array without an employee ID