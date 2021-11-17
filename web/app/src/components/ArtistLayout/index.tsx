import React, { PropsWithChildren, ReactNode, useState } from "react";
import { useRouter } from "next/router";
import { Menu } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";
import { CommentOutlined, HomeOutlined, ScheduleOutlined, SettingOutlined } from "@ant-design/icons";
import FollowSection from "src/components/ArtistLayout/FollowSection";

type Query = { artistId: string }

export default function ArtistLayout({ children }: PropsWithChildren<ReactNode>) {
  const router = useRouter<Query>();
  const initMenu = router.pathname.split("/")[3];
  const [ enabledMenu, setEnabledMenu ] = useState<string>(initMenu);

  const artistId = router.query.artistId ? parseInt(router.query.artistId) : -1;

  const onMenuSelected = (e: MenuInfo) => {
    router.push(`/artist/${ artistId }/${ e.key }`).then(((isPushed) => {
      if (isPushed) setEnabledMenu(e.key);
    }));
  };

  return (
    <>
      <FollowSection artistId={ artistId }/>

      <Menu mode="horizontal" selectedKeys={ [ enabledMenu ] } onClick={ onMenuSelected } style={ { width: "100%" } }>
        <Menu.Item key={ "home" } icon={ <HomeOutlined/> }>HOME</Menu.Item>
        <Menu.Item key={ "calendar" } icon={ <ScheduleOutlined/> }>CALENDAR</Menu.Item>
        <Menu.Item key={ "board" } icon={ <CommentOutlined/> }>BOARD</Menu.Item>
        <Menu.Item key={ "setting" } icon={ <SettingOutlined/> }>SETTING</Menu.Item>
      </Menu>

      { children }
    </>
  );
}
