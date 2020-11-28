import React, {useContext, useState} from 'react';
import { RouteComponentProps } from 'react-router';
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList, IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
    IonSearchbar,
    IonInfiniteScroll,IonInfiniteScrollContent,
    useIonViewWillEnter
} from '@ionic/react';
import { add ,closeCircleOutline} from 'ionicons/icons';
import Item from './Item';
import { getLogger } from '../core';
import { ItemContext } from './ItemProvider';
import {AuthContext, AuthState} from "../auth";
import {Redirect} from "react-router-dom";

const log = getLogger('ItemList');

const ItemList: React.FC<RouteComponentProps> = ({ history }) => {
  const { items, fetching, fetchingError,all,nextPage,filterPage,page,filter} = useContext(ItemContext);
  const {logout,isAuthenticated}=useContext(AuthContext);
  const [number,setNumber]=useState<number>(page);
  const [search,setSearch]=useState<string>(filter);
  log('render');
  log(all);
  const logoutAction=()=>{
    logout?.();
  }
  log('render');
  if (!isAuthenticated) {
    return <Redirect to={{ pathname: '/login' }} />
  }
  async function fetchData(){
    if (!all) {
      var rez = number;
      setNumber(rez + 1);
      nextPage && await nextPage(rez+1,search);
    }
  }
  async function filterInPage(s:string){
    setSearch(s);
    setNumber(0);
    filterPage && await filterPage(0,s);
  }

  async function searchNext($event: CustomEvent<void>) {
    await fetchData();
    ($event.target as HTMLIonInfiniteScrollElement).complete();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tea shop?</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar
            value={search}
            debounce={500}
            onIonChange={e => filterInPage(e.detail.value!)}>
        </IonSearchbar>
        {items && (
          <IonList>
            {items.map(({ _id, tea,type}) =>
              <Item key={_id} _id={_id} tea={tea} type={type} onEdit={id => history.push(`/item/${id}`)}/>)}
          </IonList>
        )}
        {fetchingError && (
          <div>{fetchingError.message || 'Failed to fetch items'}</div>
        )}
        <IonLoading isOpen={fetching} message="Fetching items" />
        <IonInfiniteScroll threshold="100px" disabled={all} onIonInfinite={(e: CustomEvent<void>) => searchNext(e)}>
          <IonInfiniteScrollContent
              loadingText="Loading more teas(?)...">
          </IonInfiniteScrollContent>
        </IonInfiniteScroll>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/item')}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        <IonFab vertical="bottom" horizontal="start" slot="fixed">
          <IonFabButton onClick={logoutAction}>
            <IonIcon icon={closeCircleOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default ItemList;
