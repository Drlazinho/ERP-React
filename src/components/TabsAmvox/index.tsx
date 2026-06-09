import { Box, Tab, Tabs } from '@mui/material';
import { ReactNode, useState } from 'react';

type TabItem = {
  label: string;
  icon?: ReactNode;
  content: ReactNode;
};

type TabsAmvoxProps = {
  tabs: TabItem[];
  defaultIndex?: number;
};

export default function TabsAmvox({ tabs, defaultIndex = 0 }: TabsAmvoxProps) {
  const [tabIndex, setTabIndex] = useState(defaultIndex);

  const handleTabChange = (_event: unknown, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: '8px',
      }}
    >
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          '& .MuiTab-root': {
            flexDirection: 'row',
                    backgroundColor: '#fff',

            alignItems: 'center',
            gap: '8px',
            // padding: '8px 16px',
            fontSize: '0.875rem',
            textTransform: 'none',
            color: '#666',
            '&.Mui-selected': {
              color: 'red',
              fontWeight: 'bold',
            },
          },
          '& .MuiTabs-indicator': {
            backgroundColor: 'red',
          },
          '& .MuiTab-iconWrapper': {
            margin: 0,
            fontSize: '1.5rem',
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            iconPosition="start"
          />
        ))}
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {tabs[tabIndex].content}
      </Box>
    </Box>
  );
}
