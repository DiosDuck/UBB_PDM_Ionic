import React, { useContext, useEffect, useState } from 'react';
import {
  IonButton,
  IonButtons,
  IonContent, IonFab, IonFabButton,
  IonHeader, IonIcon,
  IonInput,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { getLogger } from '../core';
import { ItemContext } from './ItemProvider';
import { RouteComponentProps } from 'react-router';
import { ItemProps } from './ItemProps';
import { trash} from "ionicons/icons";

const log = getLogger('ItemEdit');

interface ItemEditProps extends RouteComponentProps<{
  id?: string;
}> {}

const ItemEdit: React.FC<ItemEditProps> = ({ history, match }) => {
  const { items, saving, savingError, saveItem,deletedItem } = useContext(ItemContext);
  const [tea, setTea] = useState('');
  const [type, setType]=useState('');
  const [item, setItem] = useState<ItemProps>();
  useEffect(() => {
    log('useEffect');
    const routeId = match.params.id || '';
    const item = items?.find(it => it._id === routeId);
    setItem(item);
    if (item) {
      setTea(item.tea);
      setType(item.type)
    }

  }, [match.params.id, items]);
  const handleSave = () => {
    const editedItem = item ? { ...item, tea,type } : { tea,type };
    saveItem && saveItem(editedItem).then(() => history.goBack());
  };
  const handleDelete=()=>{
    const delItem=item?{...item,tea,type}:{tea,type};
    deletedItem && deletedItem(delItem).then(() => history.goBack());
  }
  log('render');
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleSave}>
              Save
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonInput value={tea} placeholder="Tea" onIonChange={e => setTea(e.detail.value || '')} />
        <IonInput value={type} placeholder="Type" onIonChange={e => setType(e.detail.value || '')} />
        <IonLoading isOpen={saving} />
        {savingError && (
          <div>{savingError.message || 'Failed to save item'}</div>
        )}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={handleDelete}>
            <IonIcon icon={trash} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default ItemEdit;
