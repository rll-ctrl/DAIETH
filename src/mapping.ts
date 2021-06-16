import { BigInt, log } from "@graphprotocol/graph-ts"
import { Dai, Approval, Transfer } from "../generated/Dai/Dai"
import { Supply } from "../generated/schema"

export function handleApproval(event: Approval): void {
  let entity = Supply.load(event.transaction.from.toHex())

  if (entity == null) {
    entity = new Supply(event.transaction.from.toHex())
    entity.count = BigInt.fromI32(0)
  }

  let contract = Dai.bind(event.address).totalSupply()
  log.info("totalSupply reverted", [contract.toString()])

  //entity.count = entity.count + BigInt.fromI32(1)
  entity.count = contract
  entity.save()

}

export function handleTransfer(event: Transfer): void {}
