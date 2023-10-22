import React from 'react';
import { Panel, PanelHeader, Div, Text } from '@vkontakte/vkui';

const Footer = () => {
  return (
    <Panel id="footer">
      <PanelHeader>О проекте</PanelHeader>
      <Div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text weight="regular" style={{ color: '#FFFFFF' }}>
          Проект был разработан с любовью ❤️ командой PRO100BYTE
        </Text>
      </Div>
    </Panel>
  );
};

export default Footer;
