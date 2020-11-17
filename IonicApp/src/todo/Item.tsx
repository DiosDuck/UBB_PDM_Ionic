import React from 'react';
import {IonFab, IonFabButton, IonIcon, IonItem, IonLabel} from '@ionic/react';
import { ItemProps } from './ItemProps';
import { trash} from "ionicons/icons";

interface ItemPropsExt extends ItemProps {
  onEdit: (id?: string) => void;
  onDelete: (text: string, id?: string)=> void;
}

const Item: React.FC<ItemPropsExt> = ({ id, text, onEdit ,onDelete}) => {
  return (
    <IonItem>
      <IonLabel onClick={ ()=>onEdit(id) }>{text}</IonLabel>
      <IonFab horizontal="end">
        <IonFabButton onClick={ ()=>onDelete(text,id) }>
            <IonIcon icon={trash}/>
        </IonFabButton>
      </IonFab>
    </IonItem>
  );
};

export default Item;
