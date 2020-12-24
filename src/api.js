import React, { useState } from 'react'
import firebase from './components/firebase'

export default {
  getProducts: async () => {
    const res = await firebase
      .firestore()
      .collection('Items')
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const result = (doc.id, ' => ', doc.data())
        })
      })
  },
}
