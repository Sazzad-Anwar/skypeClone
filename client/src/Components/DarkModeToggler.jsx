import { useEffect, useState } from 'react';

const DarkModeToggler = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('darkMode') === 'true' || darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            localStorage.setItem('darkMode', 'false');
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <span
            onClick={() => {
                setDarkMode(!darkMode);
                localStorage.setItem('darkMode', !darkMode);
            }}
            className={`material-icons-outlined cursor-pointer hover:text-gray-700 dark:text-white dark:hover:text-gray-300 transition-all ease-in-out`}
        >
            {darkMode || localStorage.getItem('darkMode') === 'true'
                ? 'light_mode'
                : 'nightlight_round'}
        </span>
    );
};

export default DarkModeToggler;
