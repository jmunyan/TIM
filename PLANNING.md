feature planning:
    Security: 
        has working passwords and tokens (OAUTH 2.0), with future proofed components that allow for use of third party sign-in (eg google or other company email parameters)
        can be launched in a private local subnet or hosted on a server
        separate user accounts with 2 or more levels of user permissions
            possibly make it company specific what they're called, put requirements below with potential names
            admin/1 - can do what they want
            manager/2 - can do anything except change company parameters
            captain/3 - can use all job related tools except to remove/create jobs
            worker/4 - can update jobs but nothing else, can add notes but cannot edit them
    
    UI: 
        excel type data entry for actual inventory (PrimeReact DataGrid or something similar)
        tracks: 
            purchase and sale price of part, 
            date acquired, 
            person who entered the information,
        organization parameters as necessary
        scales for use on a mobile browser
        light and dark mode
        2 or more levels of user permissions (also a security concern)
        part tracking:
            camera input for QR codes?
            QR code generation?
        a job wizard that allows for pricing in multiple forms
            needs to accommodate service shops (so rather than the part costing x, it's services rendered cost)
        quoting capabilities?
        reporting
            for site metrics
            for part usage/consumables
            for jobs
            FOR INVENTORY/AUDITS
                possibly a separate audit mode?
                ability to print out or display all quantities is essential
        light and dark mode? (low priority)
        clean, intuitive navigation
        changeable font sizes and scaling (low priority)
        option to upload a pictures to part line or job? (need to develop job wizard requirements)
        Toast for notifications because it's easy and functional
    
    API/database:
        make it super easy to switch to something else because only a monster wouldn't
        make it possible to add columns to the inventory or job area?
            how does this affect the job wizard?
            maybe a separate toggle area for 'custom fields'
        
/*  
*    trying to get an agent to handle the to do list (because why not?) 
*    ideal situation would be to run a single ai model that can just manage the to do rather than have a list here at all, but we need the data to get there. 
*    a free solution (jira or even apple reminders/google to do) is definitely more effective, this is pretty much just for fun
*
*    current roadblocks: 
*        local models cant handle the context size of the codebase
*        could use commit log to handle this? 
*            need to test how accurate to the to do item the comit needs to be.
*            if it needs to be too accurate, then this is a waste of time
*        bigger model/context works better, but I run our of compute locally...
*            thus host a test server locally as mentioned above (raspberry pi or another computer I have round, will need more testing to see what will fit where.)
*/