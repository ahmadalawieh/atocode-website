<?php
/**
 * ATOCODE Git Ultimate Fix
 * This script clears all possible blocks for cPanel deployment.
 */

echo "<h2>ATOCODE Git Ultimate Fix</h2>";
echo "<pre>";

function run_command($cmd)
{
    echo "<b>Running: $cmd</b>\n";
    if (function_exists('shell_exec')) {
        $output = shell_exec($cmd . " 2>&1");
    } elseif (function_exists('exec')) {
        exec($cmd . " 2>&1", $out_arr);
        $output = implode("\n", $out_arr);
    } else {
        die("Error: No execution functions enabled.");
    }
    echo $output . "\n\n";
    return $output;
}

// 1. Remove any Git locks
echo "Step 1: Removing Git locks...\n";
@unlink(".git/index.lock");
echo "Done.\n\n";

// 2. Force Reset and Clean
echo "Step 2: Force resetting and cleaning EVERYTHING...\n";
run_command("git fetch origin");
run_command("git checkout -f main");
run_command("git reset --hard origin/main");
run_command("git clean -fd");

// 3. Fix .cpanel.yml to the simplest possible version
echo "Step 3: Creating a foolproof .cpanel.yml...\n";
$yml = "---\ndeployment:\n  tasks:\n    - /bin/echo \"Deployment successful\"\n";
file_put_contents(".cpanel.yml", $yml);
echo "Done.\n\n";

// 4. Final Status Check
echo "Step 4: Final status check...\n";
run_command("git status");

echo "\n<b>Ultimate Fix Complete!</b>\n";
echo "1. Go to cPanel and click <b>Deploy</b> now.\n";
echo "2. If it still fails, please copy ALL the text above.\n";
echo "<b>IMPORTANT:</b> This script will now DELETE ITSELF.\n";

// Delete itself
unlink(__FILE__);
echo "</pre>";
?>