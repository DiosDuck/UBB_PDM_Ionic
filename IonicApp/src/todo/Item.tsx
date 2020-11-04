import React from 'react';
import {IonFab, IonFabButton, IonIcon, IonItem, IonLabel} from '@ionic/react';
import { ItemProps } from './ItemProps';
import {pencil, trash} from "ionicons/icons";

interface ItemPropsExt extends ItemProps {
  onEdit: (id?: string) => void;
  onDelete: (text: string, id?: string)=> void;
}

const Item: React.FC<ItemPropsExt> = ({ id, text, onEdit ,onDelete}) => {
  return (
    <IonItem>
      <IonLabel>{text}</IonLabel>
      <IonFab horizontal="center">
        <IonFabButton onClick={ ()=>onEdit(id) }>
            <IonIcon icon={pencil}/>
        </IonFabButton>
      </IonFab>
      <IonFab horizontal="end">
        <IonFabButton onClick={ ()=>onDelete(text,id) }>
            <IonIcon icon={trash}/>
        </IonFabButton>
      </IonFab>
    </IonItem>
  );
};

export default Item;
