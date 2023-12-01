// Dependencies
import { useContext } from 'react';
import { TabContext } from './Tabs';

/**
 * Hook for accessing the tab context.
 * @returns The context of the tab.
 * @throws An error if used outside a TabProvider.
 */

export const useTabContext = () => {
    const context = useContext(TabContext);
    if (!context) {
        throw new Error('useTabContext must be used within a TabProvider');
    }
    return context;
};
