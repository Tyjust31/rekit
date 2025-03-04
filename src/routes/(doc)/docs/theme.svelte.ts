export function UsedarkMode() {
    
    // Vérifiez si localStorage est disponible
    let storedDarkMode = null;
    if (typeof localStorage !== 'undefined') {
        storedDarkMode = localStorage.getItem('darkMode');
    }

    let darkMode: boolean = $state(storedDarkMode === null ? false : JSON.parse(storedDarkMode));

    function toggle() {
        darkMode = !darkMode;
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('darkMode', JSON.stringify(darkMode));
        }
    }

    return {
        get darkMode() { return darkMode; },
        toggle
    };
}