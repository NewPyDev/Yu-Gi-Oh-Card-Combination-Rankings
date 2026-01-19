# Yu-Gi-Oh Combo Rankings Data Generation

Write-Host "=========================================="
Write-Host "Yu-Gi-Oh Data Gen"
Write-Host "=========================================="

# Check Python
try {
    $ver = python --version 2>&1
    Write-Host "Python found: $ver"
}
catch {
    Write-Host "Python not found! Install from python.org"
    exit 1
}

Set-Location -Path "data-processing"

# 1. Install Deps
Write-Host "Installing dependencies..."
pip install -r requirements.txt

# 2. Fetch Cards
Write-Host "Fetching cards (1-2 mins)..."
python fetch_cards.py

# 3. Calc Rankings
Write-Host "Select Mode:"
Write-Host "1 - Quick Test (30 sec)"
Write-Host "2 - Safe Batch (5 mins)"
Write-Host "3 - SMART Full Analysis (2 mins)"

$val = Read-Host "Enter 1, 2, or 3"

if ($val -eq '1') {
    python calculate_rankings_quick.py
}
elseif ($val -eq '3') {
    python calculate_rankings_smart.py
}
else {
    python calculate_rankings.py
}

Write-Host "DONE! Check public/rankings.json"
Set-Location -Path ".."
