Total Inventory Management (TIM)

Goals: 
    Primary: 
        Create an inventory management system capable of tracking items, their position in storage, and their associated jobs
        this has shifted to be more about the jobs than the inventory due to current/future needs.

    Secondary:
        John Munyan - stay up to date on software development skills and put something on my personal GitHub for potential employers to see. 

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
        - started using Jira, as it's free for single user teams, but it was a little too feature rich, might try something simpler.
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
    - research websockets, up to date information is essential to a production scenario. [STARTED]
        - https://guides.rubyonrails.org/action_cable_overview.html

    WEB
    - create page layout/styling
        - soften background on dark mode
        - add 'ThemedButton' colors to the actual Theme
        - fix dark/light mode theme change button issues
        - integrate initial state of d/l theme with browser settings
        - menu button doesn't shift when the scroll bar opens
    - create settings pages [STARTED]
        - main page file and routing added [DONE]
        - add two sections to the main page
            - user settings
            - organization settings 
    - create inventory page
    - create job wizard
        - develop more specific job wizard requirements
        - make page to match those requirements
    - create job editor
        - page/route made, but doesn't have editing capabilities
    - create a job page for each section
        - upcoming
        - blast
        - garnet
        - cabinet
        - prep? or should we make it prep/wash?
        - masking
        - powder
        - takedown
    - create additional test data
    - create auditing tools
        - print template (also useable for job quoting?)
        - how should it be formatted?
    - finish "schedule" page 
        - move job dialog created but not styled
        - need to test dialog size styling on phone
        - 

    - create launch scripts/instructions for other contributors
        - docker? (that's what I have seen used in the past)
        - research other container options

    API
    - there's a lot to do here, but first lets plan the database
    - make a lucidchart of the tables
    - create migrations in ruby
    - update controllers to 
    - create testing for the 
    