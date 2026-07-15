# PowerShell script to start both API and WEB apps

# Change to API directory
Set-Location API

# Install Ruby dependencies
Write-Host "Installing Ruby dependencies..."
bundle install

# Run database migrations
Write-Host "Running database migrations..."
bundle exec rails db:migrate

# Optional: Seed database (commented out as no seed data yet)
# Write-Host "Seeding database..."
# bundle exec rails db:seed

# Start Rails server in background
Write-Host "Starting Rails API server..."
Start-Process -FilePath "cmd" -ArgumentList "/c bundle exec rails server" -NoNewWindow

# Change to WEB directory
Set-Location ../WEB

# Install Node dependencies
Write-Host "Installing Node dependencies..."
npm install

# Start Expo web app in background
Write-Host "Starting Expo WEB app..."
Start-Process -FilePath "cmd" -ArgumentList "/c npm start" -NoNewWindow

Write-Host "Both API and WEB apps started successfully!"