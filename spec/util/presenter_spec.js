import {Presenter} from '../../src/util/presenter'

describe('Presenter', () => {
  let subject
  let panel
  let box

  beforeEach(() => {
    panel = { defaultColor: 'default', thresholds: [] }
    box = { percent: 99.5 }
    subject = new Presenter(panel)
  })

  describe('call', () => {
    describe('when there are no thresholds', () => {
      it('assigns the default color', () => {
        subject.call(box)
        expect(box.color).toEqual('default')
      })
    })

    describe('when the thresholds are too high', () => {
      it('assigns the default color', () => {
        panel.thresholds.push({ value: '99.6', color: 'color' })
        subject.call(box)
        expect(box.color).toEqual('default')
      })
    })

    describe('when a threshold value is reached', () => {
      it('assigns the threshold color', () => {
        panel.thresholds.push({ value: '99', color: 'color' })
        subject.call(box)
        expect(box.color).toEqual('color')
      })
    })

    describe('when several thresholds are reached', () => {
      it('uses the closest threshold color', () => {
        panel.thresholds.push({ value: '-99', color: 'color1' })
        panel.thresholds.push({ value: '-79', color: 'color3' })
        panel.thresholds.push({ value: '-89', color: 'color2' })
        subject.call(box)
        expect(box.color).toEqual('color3')
      })
    })
  })
})
