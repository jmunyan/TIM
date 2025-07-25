Total Inventory Management (TIM)

Goals: 
    Primary: 
        Create an inventory management system capable of tracking items, their position in storage, and their associated jobs
        this has shifted to be more about the jobs than the inventory due to current/future needs.

    Secondary:
        stay up to date on software development skills and put something on my personal GitHub for potential employers to see

Requirements:
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
            person who entered the information (including MAC?),
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
        

To Do List: 
    everything. :OneStepPlanToConquerTheUniverse:
    - create repo [DONE]
    - create initial project plan [DONE]
    - find free project management software and set up a project
        - track hours with clockify (this first hour was not tracked)
        - GitHub has some features that are free?
        - is Bitbucket free to individuals? Jira is, still haven't checked bitbucket
        - should this be part of the app? :lol: :sweat-smile:
    - plan features
        - brainstorm useful and necessary features [DONE]
        - create prioritized list of wanted features
    - research what API/Database to use (likely Ruby on Rails since a lot of employers seem to be asking for it) [DONE]
        - using ruby on rails
    - research best Framework to use (React vs. Next etc.) [DONE]
    - create page layout
    - create settings pages
        - user settings
        - organization settings
    - create inventory page
    - create job wizard
        - develop more specific job wizard requirements
        - make page to match those requirements
    - create job editor
    - create additional test data
    - create auditing tools
        - print template (also useable for job quoting?)
        - how should it be formatted?