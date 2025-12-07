export const getSectionTitle = (section: string): string => {
    switch (section) {
        case 'overview':
            return 'Übersicht & Logistik';
        case 'cities':
            return 'Kolonien';
        case 'employees':
            return 'Mitarbeiter Übersicht';
        case 'sql':
            return 'SQL-Queries & Erklärungen';
        default:
            return section.charAt(0).toUpperCase() + section.slice(1); 
    }
};