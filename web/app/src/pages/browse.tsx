import React, { useEffect, useState } from "react";
import { Button, Card, Divider, Empty, Form, FormProps, Input, List, Select, SelectProps } from "antd";
import { ListItemProps } from "antd/lib/list"
import { HeartFilled, SearchOutlined } from "@ant-design/icons";
import { ArtistEntity } from "src/models/ArtistEntity";
import ArtistRepository from "src/repositories/ArtistRepository";
import { useRouter } from "next/router";
import { Media, ResponsiveProps } from "src/lib/fresnel";

const CharSet = {
  "전체": { start: "가", end: "힣" },
  "ㄱ": { start: "가", end: "깋" },
  "ㄴ": { start: "나", end: "닣" },
  "ㄷ": { start: "다", end: "딯" },
  "ㄹ": { start: "라", end: "맇" },
  "ㅁ": { start: "마", end: "밓" },
  "ㅂ": { start: "바", end: "빟" },
  "ㅅ": { start: "사", end: "싷" },
  "ㅇ": { start: "아", end: "잏" },
  "ㅈ": { start: "자", end: "짛" },
  "ㅊ": { start: "차", end: "칳" },
  "ㅋ": { start: "카", end: "킿" },
  "ㅌ": { start: "타", end: "팋" },
  "ㅍ": { start: "파", end: "핗" },
  "ㅎ": { start: "하", end: "힣" },
}

type CharSetType = keyof typeof CharSet;
type SortType = "name" | "follower";
type ComparatorType = (a: ArtistEntity, b: ArtistEntity) => number;

function onLoadFailed(err: Error) {
  console.log(err);
  alert("아티스트 리스트를 가져올 수 없습니다");
}

function SearchForm({ form, onFinish, isMobile }: Required<Pick<FormProps, "form" | "onFinish">> & ResponsiveProps) {
  const style: React.CSSProperties = {
    marginTop: 20,
    display: "flex",
    width: isMobile ? "100%" : "70%",
    minWidth: isMobile ? undefined : "500px",
    margin: "auto"
  }
  return (
    <Form form={ form } style={ style } onFinish={ onFinish }>
      <Form.Item name="inputText" style={{ flexGrow: 1 }}>
        <Input placeholder="검색어를 입력해주세요" style={ { height: 40, fontSize: 15, borderRight: "none" } }/>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" icon={ <SearchOutlined style={{ fontSize: 25 }}/> } style={{ width: 70, height: 40 }}/>
      </Form.Item>
    </Form>
  )
}

function CharacterFilter({ currentChar, onClickChar, isMobile }: { currentChar?: CharSetType, onClickChar: ListItemProps["onClick"] } & ResponsiveProps) {
  return (
    <List
      grid={ { gutter: 10, column: isMobile ? 5 : Object.keys(CharSet).length } }
      style={ { margin: 20 } }
      dataSource={ Object.keys(CharSet) }
      renderItem={ char =>
        <List.Item
          id={ char }
          style={ { fontSize: "1rem", cursor: "pointer", color: char === currentChar ? "#40a9ff" : "rgba(0,0,0,.85)" } }
          onClick={ onClickChar }
        >{ char }</List.Item>
      }
    />
  )
}

function ResultList({ isLoading, dataSource, isMobile }: { isLoading: boolean ,dataSource: ArtistEntity[] } & ResponsiveProps) {
  const router = useRouter();
  const cardStyle: React.CSSProperties = {
    border: "1px solid #00000050",
    cursor: "pointer"
  }
  return (
    <List
      grid={ { gutter: 16, column: isMobile ? 1 : 4 } }
      locale={ { emptyText: <Empty description="조건에 맞는 아티스트가 없어요...ㅠ" style={ { color: "rgba(0, 0, 0, 0.5)" } }/> } }
      dataSource={ dataSource }
      loading={ { tip: "데이터를 불러오는 중입니다", size: "large", spinning: isLoading } }
      renderItem={artist =>
        <List.Item>
          <Card title={ artist.name } style={ cardStyle } onClick={ () => router.push(`/artist/${ artist.id }/home`) }>
            <div style={ { display: "flex", gap: 10, alignItems: "center" } }>
              <HeartFilled style={ { color: "red" } }/>
              { artist.followerList.length } 명
            </div>
          </Card>
        </List.Item>
      }
    />
  )
}

export default function Browse() {
  const [ form ] = Form.useForm();
  const [ allArtistList, setAllArtistList ] = useState<ArtistEntity[]>([]);
  const [ currentArtistList, setCurrentArtistList ] = useState<ArtistEntity[]>([]);
  const [ currentSortType, setCurrentSortType ] = useState<SortType>("name");
  const [ currentChar, setCurrentChar ] = useState<CharSetType | undefined>("전체");
  const [ isLoading, setIsLoading ] = useState<boolean>(true);

  useEffect(() => {
    ArtistRepository.getArtistList()
      .then(artistList => {
        setAllArtistList(artistList);
        setCurrentArtistList(artistList);
      })
      .catch(onLoadFailed)
      .finally(() => setIsLoading(false));
  }, []);

  const sortArtistList = (sortType: typeof currentSortType, dataSource: ArtistEntity[]): ArtistEntity[] => {
    const compareFollower: ComparatorType = (a, b) => b.id - a.id;
    const compareName: ComparatorType = (a, b) => a.name > b.name ? 1 : -1;
    switch (sortType) {
      case "name":
        return dataSource.sort(compareName);
      case "follower":
        return dataSource.sort(compareFollower);
      default:
        return dataSource.sort(compareName);
    }
  }

  const filterArtistList = (char: typeof currentChar, dataSource: ArtistEntity[]) => {
    if (char) {
      const { start, end } = CharSet[char];
      return dataSource.filter(value => (start <= value.name) && (value.name <= end));
    } else {
      return dataSource;
    }
  }

  const doSearchKeyword: FormProps<{ inputText: string }>["onFinish"] = ({ inputText }) => {
    if (inputText.length === 0) {
      alert("검색어를 입력해주세요")
    } else {
      ArtistRepository.searchArtistList(inputText)
        .then(artistList => {
          setCurrentArtistList(artistList);
          setCurrentChar(undefined);
          form.resetFields();
        })
        .catch(onLoadFailed)
        .finally(() => setIsLoading(false));
    }
  }

  const doFilterChar = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const filter = event.currentTarget.id as CharSetType;
    const result = filterArtistList(filter, allArtistList);
    setCurrentArtistList(result);
    setCurrentChar(event.currentTarget.id as CharSetType);
  }

  const doChangeSort: SelectProps<SortType>["onChange"] = (value, option) => {
    setCurrentSortType(value);
  }

  return <div>
    <h2 style={ { margin: 20 } }>찾아보기</h2>

    {/* 키워드 검색창 */}
    <Media lessThan="md">
      <SearchForm form={ form } onFinish={ doSearchKeyword } isMobile={ true }/>
    </Media>

    <Media greaterThanOrEqual="md">
      <SearchForm form={ form } onFinish={ doSearchKeyword } isMobile={ false }/>
    </Media>

    {/* 초성 검색 */}
    <Media lessThan="md">
      <CharacterFilter currentChar={ currentChar } onClickChar={ doFilterChar } isMobile={ true }/>
    </Media>

    <Media greaterThanOrEqual="md">
      <CharacterFilter currentChar={ currentChar } onClickChar={ doFilterChar } isMobile={ false }/>
    </Media>

    {/* 결과 */}
    <Divider style={{ border: "1px solid #00000050" }} />

    <Select<SortType> defaultValue="name" style={{ width: 120, marginBottom: 30 }} onChange={ doChangeSort }>
      <Select.Option value="name">이름 순</Select.Option>
      <Select.Option value="follower">팔로워 순</Select.Option>
    </Select>

    <Media lessThan="md">
      <ResultList
        isLoading={ isLoading }
        dataSource={ sortArtistList(currentSortType, filterArtistList(currentChar, currentArtistList)) }
        isMobile={ true }
      />
    </Media>

    <Media greaterThanOrEqual="md">
      <ResultList
        isLoading={ isLoading }
        dataSource={ sortArtistList(currentSortType, filterArtistList(currentChar, currentArtistList)) }
        isMobile={ false }
      />
    </Media>
  </div>
}