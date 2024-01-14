// Sidebar.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100%;
  background-color: #333;
  color: white;
  padding: 20px;
`;

const SidebarItem = styled.div`
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    color: #00bcd4;
  }
`;

interface SidebarProps {
  onSelectItem: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectItem }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    onSelectItem(item);
  };

  return (
    <SidebarContainer>
      <h2>Sidebar</h2>
      <SidebarItem onClick={() => handleItemClick('Kanban')}>
        Kanban Prompts
      </SidebarItem>
      <SidebarItem onClick={() => handleItemClick('JSONs')}>
        JSON Storage
      </SidebarItem>
    </SidebarContainer>
  );
};

export default Sidebar;