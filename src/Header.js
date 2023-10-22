import React from 'react';
import { PanelHeader } from '@vkontakte/vkui';
import { Icon28SearchOutline, Icon28Profile } from '@vkontakte/icons';

const Header = () => {
  return (
    <PanelHeader left={<Icon28SearchOutline fill="#FFFFFF" onClick={() => alert('Поиск пока недоступен')} />} right={<Icon28Profile fill="#FFFFFF" onClick={() => alert('Вход пока недоступен')} />}>
      Zenfinity
    </PanelHeader>
  );
};

export default Header;
