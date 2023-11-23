// Lib Dependencies
import {
    ReactNode,
    useState,
    useCallback,
    createContext,
    useContext
} from 'react';

// Dependencies
import './Tabs.css';

/**
 * Defines the properties of the TabContext.
 */
interface TabContextProps {
    selectedTab: string;
    setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Context for managing tab state.
 */
const TabContext = createContext<TabContextProps | undefined>(undefined);

/**
 * Properties for the TabProvider component.
 */
interface TabProviderProps {
    children: ReactNode;
    defaultValue: string;
}

/**
 * Provider for managing tab state and providing the context to its children.
 * @param children - The child components that will have access to the tab context.
 * @param defaultValue - The default value for the selected tab.
 */
export const TabProvider: React.FC<TabProviderProps> = ({
    children,
    defaultValue
}) => {
    const [selectedTab, setSelectedTab] = useState<string>(defaultValue);

    return (
        <TabContext.Provider value={{ selectedTab, setSelectedTab }}>
            {children}
        </TabContext.Provider>
    );
};

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

/**
 * Properties for the Tabs component.
 */
export interface TabsProps {
    children: ReactNode;
    defaultValue: string;
}

/**
 * Wrapper component for providing the tab context to its children.
 * @param children - The child components that will have access to the tab context.
 * @param defaultValue - The default value for the selected tab.
 */
export const Tabs: React.FC<TabsProps> = ({ children, defaultValue }) => {
    return <TabProvider defaultValue={defaultValue}>{children}</TabProvider>;
};

/**
 * Properties for the TabsList component.
 */
export interface TabsListProps {
    children: ReactNode;
}

/**
 * Component for rendering a list of tabs.
 * @param children - The child components representing the tab triggers.
 */
export const TabsList: React.FC<TabsListProps> = ({ children }) => {
    return <ul className="tabs-list-container">{children}</ul>;
};

/**
 * Properties for the TabTrigger component.
 */
export interface TabTriggerProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    value: string;
}

/**
 * Component representing a tab trigger.
 * @param value - The value associated with the tab trigger.
 * @param children - The child components representing the content of the tab trigger.
 * @param buttonProps - Additional props for the button element.
 */
export const TabTrigger: React.FC<TabTriggerProps> = ({
    value,
    children,
    ...buttonProps
}) => {
    const { setSelectedTab, selectedTab } = useTabContext();

    /**
     * Handles the click event for the tab trigger.
     */
    const handleClick = useCallback(
        () => setSelectedTab(value),
        [value, setSelectedTab]
    );

    return (
        <li className="tab-trigger-container">
            <button
                onClick={handleClick}
                className={value === selectedTab ? 'active' : ''}
                {...buttonProps}>
                {children}
            </button>
        </li>
    );
};

/**
 * Properties for the TabContent component.
 */
export interface TabContentProps {
    children: ReactNode;
    value: string;
}

/**
 * Component representing the content of a tab.
 * @param value - The value associated with the tab content.
 * @param children - The child components representing the content of the tab.
 */
export const TabContent: React.FC<TabContentProps> = ({ children, value }) => {
    const { selectedTab } = useTabContext();

    // Check if the selectedTab equals the provided value
    const isActive = selectedTab === value;

    // Dynamically set the className based on the isActive condition
    const className = `tab-content-container ${isActive ? 'active' : ''}`;

    return <div className={className}>{children}</div>;
};
